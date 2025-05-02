const formattedDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
});

export const fetchPosts = async (user: any, session: any, setIsLoading: any, setArticles: any) => {
    setIsLoading(true);
    const resp = await fetch("/api/blog");
    const data = await resp.json();
    
    const blog = user?.role == "admin" 
        ? data 
        : data.filter((article: any) => article.author?._id === session?.user?.id);
    
    localStorage.setItem("totalBlogs", JSON.stringify(blog.length));
    
    const blogStructure = blog.map((article: any) => ({
        id: article._id,
        content: article.content,
        status: article.status,
        title: article.title,
        tag: article.tag,
        image: article.image,
        createdAt: formattedDate(new Date(article.date)),
    }));
    
    setArticles(blogStructure);
    setIsLoading(false);
};