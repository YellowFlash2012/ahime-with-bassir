import bcrypt from "bcryptjs"

const data = {
    products: [
        {
            // _id: '1',
            name: "Nike Slim Shirt",
            slug: "nike-slim-shirt",
            category: "Shirts",
            image: "/images/p1.jpg",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirts",
        },
        {
            // _id: '2',
            name: "Adidas Fit Shirt",
            slug: "adidas-fit-shirt",
            category: "Shirts",
            image: "/images/p2.jpg",
            price: 250,
            countInStock: 20,
            brand: "Adidas",
            rating: 4,
            numReviews: 10,
            description: "high quality shirts",
        },
        {
            // _id: '3',
            name: "Nike Slim Pant",
            slug: "nike-slim-pant",
            category: "Pants",
            image: "/images/p3.jpg",
            price: 25,
            countInStock: 15,
            brand: "Nike",
            rating: 4.5,
            numReviews: 15,
            description: "high quality pants",
        },
        {
            // _id: '4',
            name: "Puma Fit Pant",
            slug: "puma-fit-pant",
            category: "Pants",
            image: "/images/p4.jpg",
            price: 65,
            countInStock: 5,
            brand: "Puma",
            rating: 4.5,
            numReviews: 15,
            description: "high quality pants",
        },
    ],
    users: [
        {
            name: "Hokage",
            email: "hokage@konoha.io",
            password: bcrypt.hashSync('hokageoftheleaf'),
            isAdmin:true
        },
        {
            name: "Houki Matatami",
            email: "houki@konoha.io",
            password: bcrypt.hashSync('houkioftheleaf'),
            isAdmin:false
        },
        {
            name: "Kakashi Hatake",
            email: "kakashi@konoha.io",
            password: bcrypt.hashSync('kakashioftheleaf'),
            isAdmin:false
        },

    ]
};

export default data