import React, { useState } from "react";

const Listing = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Rescued Golden Retriever",
      description:
        "Meet Max! This beautiful Golden Retriever was found wandering the streets...",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=400&h=300&fit=crop",
      ],
      category: "Dogs",
      animal: "dog",
      date: "2 days ago",
      likes: 45,
      status: "Available",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    },
     {
      id: 1,
      title: "Rescued Golden Retriever",
      description:
        "Meet Max! This beautiful Golden Retriever was found wandering the streets...",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=400&h=300&fit=crop",
      ],
      category: "Dogs",
      animal: "dog",
      date: "2 days ago",
      likes: 45,
      status: "Available",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    },
     {
      id: 1,
      title: "Rescued Golden Retriever",
      description:
        "Meet Max! This beautiful Golden Retriever was found wandering the streets...",
      images: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=400&h=300&fit=crop",
      ],
      category: "Dogs",
      animal: "dog",
      date: "2 days ago",
      likes: 45,
      status: "Available",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 2,
      title: "Adorable Kittens Available",
      description: "Three adorable kittens ready for adoption...",
      images: [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
      ],
      category: "Cats",
      animal: "cat",
      date: "1 week ago",
      likes: 78,
      status: "Sold",
      user: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("all");

  const animalTypes = ["all", ...new Set(posts.map((p) => p.animal))];
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = [post.title, post.description, post.animal, post.category]
      .some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAnimal = selectedAnimal === "all" || post.animal === selectedAnimal;
    return matchesSearch && matchesAnimal;
  });

  const openModal = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      alert(`Notification sent to ${selectedPost.user.name}: Your post has been deleted.`);
      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
    }
    setDeleteConfirmOpen(false);
    setSelectedPost(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedPost(null);
  };

  const toggleBookmark = (postId) => {
    setBookmarks((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const DeleteIcon = () => (
    <svg className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5-4h4a2 2 0 0 1 2 2v2H8V5a2 2 0 0 1 2-2z" />
    </svg>
  );

  const BookmarkIcon = ({ active }) => (
    <svg
      className={`w-5 h-5 ${active ? "text-yellow-500 fill-yellow-400" : "text-gray-400"}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    >
      <path d="M5 5v16l7-5 7 5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-50 h-screen flex flex-col">

        <header className="bg-white shadow-sm sticky top-0 z-20 p-6">
                    <div className="mb-4">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
 Animal Listings
  </h2>
  <p className="mt-1 text-gray-600 text-sm sm:text-base">
Manage all animal listings and posts
  </p>
</div>
          <h1 className="text-3xl font-bold mb-4">Recent Pet Posts</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <select
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              {animalTypes.map((a) => (
                <option key={a} value={a}>
                  {a === "all" ? "All Animals" : a}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden relative group"
              >
                <button
                  onClick={() => handleDeleteClick(post)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-50"
                >
                  <DeleteIcon />
                </button>

                <div onClick={() => openModal(post)} className="cursor-pointer">
                  <img src={post.images[0]} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{post.user.name}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          post.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span>❤️ {post.likes}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleBookmark(post.id); }}>
                        <div className="flex items-center gap-1">
                          <BookmarkIcon active={bookmarks.includes(post.id)} />
                          <span>{bookmarks.includes(post.id) ? 1 : 0}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {isModalOpen && selectedPost && (
        <div class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

   <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
            >
              <CloseIcon />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img src={selectedPost.user.avatar} alt={selectedPost.user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{selectedPost.user.name}</p>
                <p className="text-xs text-gray-500">{selectedPost.date}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>

            <img
              src={selectedPost.images[currentImageIndex]}
              alt=""
              className="w-full h-80 object-cover rounded-lg mb-4"
            />

            <div className="flex gap-2 overflow-x-auto mb-4">
              {selectedPost.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    i === currentImageIndex ? "border-blue-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>

            <p className="mb-4">{selectedPost.description}</p>

            <div className="flex justify-between items-center text-gray-600">
              <div className="flex items-center gap-4">
                <span>❤️ {selectedPost.likes}</span>
                <div className="flex items-center gap-1">
                  <BookmarkIcon active={bookmarks.includes(selectedPost.id)} />
                  <span>{bookmarks.includes(selectedPost.id) ? 1 : 0}</span>
                </div>
              </div>
              <button onClick={() => handleDeleteClick(selectedPost)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedPost.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;



