"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	published: boolean;
	createdAt: string;
	coverImage: string | null;
	author: {
		name: string | null;
		email: string;
	};
}

export default function PostsPage() {
	const { data: session } = useSession();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		excerpt: "",
		coverImage: "",
		published: false,
	});

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch("/api/posts");
			const data = await response.json();
			if (data.success) {
				setPosts(data.data);
			} else {
				console.error("Failed to fetch posts:", data.error);
				// Optional: Alert on fetch error if critical, or just log
				// alert("Failed to load posts: " + data.error)
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
			alert(
				"Network error fetching posts. Check your connection or server logs."
			);
		} finally {
			setLoading(false);
		}
	};

	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleEdit = (post: Post) => {
		setFormData({
			title: post.title,
			content: post.content,
			excerpt: post.excerpt || "",
			coverImage: (post as any).coverImage || "", // Handle potential missing field in type
			published: post.published,
		});
		setEditingId(post.id);
		setIsEditing(true);
		setShowForm(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const authorId = (session?.user as any)?.id || "debug-user-id";
		console.log(
			"Submitting Post. Mode:",
			isEditing ? "EDIT" : "CREATE",
			"AuthorID:",
			authorId
		);

		try {
			const url = "/api/posts";
			const method = isEditing ? "PUT" : "POST";

			const bodyPayload = {
				...formData,
				authorId: authorId,
				...(isEditing && { id: editingId }), // Add ID if editing
			};

			const response = await fetch(url, {
				method: method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bodyPayload),
			});

			const data = await response.json();

			if (response.ok) {
				cancelEdit(); // Resets form and hides it
				fetchPosts();
				alert(
					isEditing
						? "Post updated successfully!"
						: "Post created successfully!"
				);
			} else {
				console.error("Server Error:", data);
				alert(
					`FAILED to ${isEditing ? "update" : "create"} post:\n${
						data.error || "Unknown Error"
					}`
				);
			}
		} catch (error: any) {
			console.error("Error submitting post:", error);
			alert(`Network/Client Error:\n${error.message}`);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			const response = await fetch(`/api/posts?id=${id}`, {
				method: "DELETE",
			});

			const data = await response.json();

			if (response.ok) {
				fetchPosts();
				alert("Post deleted successfully");
			} else {
				console.error("Delete Error:", data);
				alert(`Failed to delete:\n${data.error}`);
			}
		} catch (error: any) {
			console.error("Error deleting post:", error);
			alert(`Delete Network Error:\n${error.message}`);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
				<Button
					onClick={() => {
						if (showForm) cancelEdit();
						else setShowForm(true);
					}}
				>
					<Plus className="mr-2" size={18} />
					{showForm ? "Cancel" : "New Post"}
				</Button>
			</div>

			{showForm && (
				<div className="mb-8">
					<Card>
						<CardHeader>
							<CardTitle>
								{isEditing ? "Edit Post" : "Create New Post"}
							</CardTitle>
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
										placeholder="Brief summary..."
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

								<div className="flex gap-2">
									<Button type="submit">
										{isEditing ? "Update Post" : "Create Post"}
									</Button>
									{isEditing && (
										<Button
											type="button"
											variant="outline"
											onClick={cancelEdit}
										>
											Cancel Edit
										</Button>
									)}
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			)}

			{loading ? (
				<div className="flex justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			) : (
				<div className="grid gap-6">
					{posts.map((post, index) => (
						<div key={post.id}>
							<Card className="overflow-hidden hover:shadow-lg transition-shadow">
								<Link
									href={`/posts/${post.id}`}
									className="cursor-pointer block"
								>
									{post.coverImage && (
										<div className="h-48 w-full overflow-hidden">
											<img
												src={post.coverImage}
												alt={post.title}
												className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
											/>
										</div>
									)}
									<CardHeader>
										<div className="flex justify-between items-start">
											<div>
												<CardTitle className="hover:text-primary transition-colors">
													{post.title}
												</CardTitle>
												<p className="text-sm text-gray-600 mt-2">
													By {post.author.name || post.author.email} •{" "}
													{formatDate(post.createdAt)}
												</p>
												{post.excerpt && (
													<p className="text-sm text-gray-700 mt-2">
														{post.excerpt}
													</p>
												)}
											</div>
											<div className="flex gap-2">
												<span
													className={`px-3 py-1 rounded-full text-sm ${
														post.published
															? "bg-green-100 text-green-800"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													{post.published ? "Published" : "Draft"}
												</span>
											</div>
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
												handleEdit(post);
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
												handleDelete(post.id);
											}}
										>
											<Trash2 size={16} className="mr-2" />
											Delete
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
