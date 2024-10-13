export const data = [
    {
        id: 1,
        title: "Bitcoin",
        content: "Introduction to Bitcoin",
        status: "processing",
        createdAt: "13/05/2024",
        tag:"#bitcoin",
        image:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
]
export type ArticleDetails = (typeof data)[number]