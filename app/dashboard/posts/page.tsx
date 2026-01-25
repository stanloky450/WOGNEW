"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { Plus, Edit, Trash2, Calendar, User, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Post {
	id: string;
	title: string;
	content: string;
	excerpt: string | null;
	published: boolean;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
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
			coverImage: (post as any).coverImage || "",
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

		try {
			const url = "/api/posts";
			const method = isEditing ? "PUT" : "POST";

			const bodyPayload = {
				...formData,
				authorId: authorId,
				...(isEditing && { id: editingId }),
			};

			const response = await fetch(url, {
				method: method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bodyPayload),
			});

			const data = await response.json();

			if (response.ok) {
				cancelEdit();
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
		<div className="container mx-auto py-6 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold text-gray-900 tracking-tight">Posts Management</h1>
				<Button
					onClick={() => {
						if (showForm) cancelEdit();
						else setShowForm(true);
					}}
                    className="shadow-md"
				>
					<Plus className="mr-2" size={18} />
					{showForm ? "Cancel" : "New Post"}
				</Button>
			</div>

			{showForm && (
				<div className="mb-8">
					<Card className="border-t-4 border-t-primary shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl">
								{isEditing ? "Edit Post" : "Create New Post"}
							</CardTitle>
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
                                                placeholder="Brief summary..."
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
									<RichTextEditor
										value={formData.content}
										onChange={(value) =>
											setFormData({ ...formData, content: value })
										}
                                        placeholder="Write your post content here..."
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
										{isEditing ? "Update Post" : "Create Post"}
									</Button>
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => (
						<Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group border-t-4 border-t-transparent hover:border-t-primary">
                            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                                        <span className="text-sm">No cover image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                     <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600 hover:bg-green-700" : ""}>
                                        {post.published ? (
                                            <span className="flex items-center gap-1"><CheckCircle size={12} /> Published</span>
                                        ) : (
                                            <span className="flex items-center gap-1"><XCircle size={12} /> Draft</span>
                                        )}
                                    </Badge>
                                </div>
                            </div>

							<CardHeader className="pb-3">
								<CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                                    <Link href={`/posts/${post.id}`} className="hover:underline">
									    {post.title}
                                    </Link>
								</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-2">
                                    <User size={14} /> 
                                    <span>{post.author.name || post.author.email || "Unknown"}</span>
                                </CardDescription>
							</CardHeader>

							<CardContent className="flex-1 pb-3">
                                {post.excerpt && (
                                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                        {post.excerpt}
                                    </p>
                                )}
                                
                                <div className="space-y-1 text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} />
                                        <span>Created: {formatDate(post.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} />
                                        <span>Updated: {formatDate(post.updatedAt)}</span>
                                    </div>
                                    {post.publishedAt && (
                                        <div className="flex items-center gap-2 text-green-600 font-medium">
                                            <CheckCircle size={12} />
                                            <span>Published: {formatDate(post.publishedAt)}</span>
                                        </div>
                                    )}
                                </div>
							</CardContent>

                            <CardFooter className="pt-3 border-t bg-gray-50/50 flex justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        handleEdit(post);
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
                                        handleDelete(post.id);
                                    }}
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </Button>
                            </CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
