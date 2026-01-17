"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface News {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	coverImage: string | null;
	published: boolean;
	createdAt: string;
	author: { name: string | null };
}

export default function NewsPage() {
	const { data: session } = useSession();
	const [news, setNews] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		excerpt: "",
		coverImage: "",
		published: false,
	});

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			const response = await fetch("/api/news");
			const data = await response.json();
			if (data.success) {
				setNews(data.data);
			}
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (isEditing && editingId) {
				const response = await fetch("/api/news", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...formData,
						id: editingId,
						coverImage: formData.coverImage,
					}),
				});

				if (!response.ok) throw new Error("Failed to update news");
			} else {
				await fetch("/api/news", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...formData,
						coverImage: formData.coverImage,
						authorId: (session?.user as any)?.id,
					}),
				});
			}

			setFormData({
				title: "",
				content: "",
				excerpt: "",
				coverImage: "",
				published: false,
			});
			setShowForm(false);
			setIsEditing(false);
			setEditingId(null);
			// fetchEvents() // calling fetchEvents? Note: the function is fetchNews. Fixing to fetchNews()
			fetchNews();
		} catch (error) {
			console.error("Error saving news:", error);
		}
	};

	const handleEdit = (item: News) => {
		setFormData({
			title: item.title,
			content: item.content,
			excerpt: item.excerpt || "",
			coverImage: item.coverImage || "",
			published: item.published,
		});
		setEditingId(item.id);
		setIsEditing(true);
		setShowForm(true);
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure?")) return;
		try {
			await fetch(`/api/news?id=${id}`, { method: "DELETE" });
			fetchNews();
		} catch (error) {
			console.error("Error deleting news:", error);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">News Management</h1>
				<Button onClick={() => setShowForm(!showForm)}>
					<Plus className="mr-2" size={18} />
					{showForm ? "Cancel" : "New News"}
				</Button>
			</div>

			{showForm && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<Card>
						<CardHeader>
							<CardTitle>{isEditing ? "Edit News" : "Create News"}</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										value={formData.title}
										onChange={(e) =>
											setFormData({ ...formData, title: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<Label htmlFor="excerpt">Excerpt</Label>
									<Input
										id="excerpt"
										value={formData.excerpt}
										onChange={(e) =>
											setFormData({ ...formData, excerpt: e.target.value })
										}
									/>
								</div>
								<div>
									<Label htmlFor="content">Content</Label>
									<Textarea
										id="content"
										value={formData.content}
										onChange={(e) =>
											setFormData({ ...formData, content: e.target.value })
										}
										rows={8}
										required
									/>
								</div>
								<div>
									<Label>Cover Image</Label>
									<ImageUpload
										value={formData.coverImage ? [formData.coverImage] : []}
										disabled={loading}
										onChange={(url) =>
											setFormData({ ...formData, coverImage: url })
										}
										onRemove={() =>
											setFormData({ ...formData, coverImage: "" })
										}
									/>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="published"
										checked={formData.published}
										onChange={(e) =>
											setFormData({ ...formData, published: e.target.checked })
										}
										className="mr-2"
									/>
									<Label htmlFor="published" className="cursor-pointer">
										Publish immediately
									</Label>
								</div>
								<Button type="submit">
									{isEditing ? "Update News" : "Create News"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			)}

			{loading ? (
				<div className="flex justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			) : (
				<div className="grid gap-6">
					{news.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="hover:shadow-lg transition-shadow overflow-hidden">
								<Link
									href={`/news/${item.id}`}
									className="block cursor-pointer"
								>
									{item.coverImage && (
										<div className="h-48 w-full overflow-hidden">
											<img
												src={item.coverImage}
												alt={item.title}
												className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
											/>
										</div>
									)}
									<CardHeader>
										<div className="flex justify-between items-start">
											<div>
												<CardTitle className="hover:text-primary transition-colors">
													{item.title}
												</CardTitle>
												<p className="text-sm text-gray-600 mt-2">
													{formatDate(item.createdAt)}
												</p>
												{item.excerpt && (
													<p className="text-sm text-gray-700 mt-2">
														{item.excerpt}
													</p>
												)}
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm ${
													item.published
														? "bg-green-100 text-green-800"
														: "bg-gray-100 text-gray-800"
												}`}
											>
												{item.published ? "Published" : "Draft"}
											</span>
										</div>
									</CardHeader>
								</Link>
								<CardContent>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												handleEdit(item);
											}}
										>
											<Edit size={16} className="mr-2" />
											Edit
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												handleDelete(item.id);
											}}
										>
											<Trash2 size={16} className="mr-2" />
											Delete
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
