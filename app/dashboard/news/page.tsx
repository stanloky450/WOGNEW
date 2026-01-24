"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit, Calendar, User, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface News {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	coverImage: string | null;
	published: boolean;
	createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
	author: { 
        name: string | null;
        email: string;
    };
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
        window.scrollTo({ top: 0, behavior: "smooth" });
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

	const cancelEdit = () => {
		setIsEditing(false);
		setEditingId(null);
		setFormData({
			title: "",
			content: "",
			excerpt: "",
			coverImage: "",
			published: false,
		});
		setShowForm(false);
	};

	return (
		<div className="container mx-auto py-6 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold text-gray-900 tracking-tight">News Management</h1>
				<Button onClick={() => {
                        if (showForm) cancelEdit();
                        else setShowForm(true);
                    }}
                    className="shadow-md"
                >
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
					<Card className="border-t-4 border-t-primary shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl">{isEditing ? "Edit News" : "Create News"}</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, title: e.target.value })
                                                }
                                                required
                                                className="mt-1"
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
                                                className="mt-1"
                                            />
                                        </div>
                                         <div className="flex items-center space-x-2 pt-4">
                                            <input
                                                type="checkbox"
                                                id="published"
                                                checked={formData.published}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, published: e.target.checked })
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <Label htmlFor="published" className="cursor-pointer font-medium">
                                                Publish immediately
                                            </Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Cover Image</Label>
                                        <div className="mt-1">
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
                                    </div>
                                </div>
								
								<div>
									<Label htmlFor="content">Content</Label>
									<Textarea
										id="content"
										value={formData.content}
										onChange={(e) =>
											setFormData({ ...formData, content: e.target.value })
										}
										rows={10}
										required
                                        className="mt-1 font-mono text-sm"
									/>
								</div>
								
                                <div className="flex gap-2 justify-end">
                                    {isEditing && (
										<Button
											type="button"
											variant="outline"
											onClick={cancelEdit}
										>
											Cancel
										</Button>
									)}
									<Button type="submit" size="lg">
										{isEditing ? "Update News" : "Create News"}
									</Button>
								</div>
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{news.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-t-transparent hover:border-t-primary h-full">
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                    {item.coverImage ? (
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                                            <span className="text-sm">No cover image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={item.published ? "default" : "secondary"} className={item.published ? "bg-green-600 hover:bg-green-700" : ""}>
                                            {item.published ? (
                                                <span className="flex items-center gap-1"><CheckCircle size={12} /> Published</span>
                                            ) : (
                                                <span className="flex items-center gap-1"><XCircle size={12} /> Draft</span>
                                            )}
                                        </Badge>
                                    </div>
                                </div>

								<CardHeader className="pb-3">
                                    <Link
                                        href={`/news/${item.id}`}
                                        className="block cursor-pointer"
                                    >
                                        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                                            {item.title}
                                        </CardTitle>
                                    </Link>
                                    <CardDescription className="flex items-center gap-2 mt-2">
                                        <User size={14} /> 
                                        <span>{item.author.name || item.author.email || "Unknown"}</span>
                                    </CardDescription>
								</CardHeader>

								<CardContent className="flex-1 pb-3">
                                    {item.excerpt && (
                                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                            {item.excerpt}
                                        </p>
                                    )}

                                    <div className="space-y-1 text-xs text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={12} />
                                            <span>Created: {formatDate(item.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} />
                                            <span>Updated: {formatDate(item.updatedAt)}</span>
                                        </div>
                                        {item.publishedAt && (
                                            <div className="flex items-center gap-2 text-green-600 font-medium">
                                                <CheckCircle size={12} />
                                                <span>Published: {formatDate(item.publishedAt)}</span>
                                            </div>
                                        )}
                                    </div>
								</CardContent>

                                <CardFooter className="pt-3 border-t bg-gray-50/50 flex justify-between">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleEdit(item);
                                        }}
                                        className="hover:bg-primary/10 hover:text-primary border-primary/20"
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
                                </CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
