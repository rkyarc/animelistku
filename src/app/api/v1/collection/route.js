import prisma from "@/libs/prisma"

export const runtime = "nodejs"

export async function POST(request) {
    const { anime_mal_id, user_email, anime_image, anime_title }  = await request.json()
    const data = { anime_mal_id, user_email, anime_image, anime_title }

    const createCollection = await prisma.collection.create({ data })

    if (!createCollection) return Response.json({ status: 500, isCreated: false })
    else return Response.json({ status: 200, isCreated: true })
}

export async function DELETE(request) {
    const { id, deleteAll, user_email } = await request.json();
    
    try {
        if (deleteAll && user_email) {
            const deleteAllCollections = await prisma.collection.deleteMany({
                where: { user_email: user_email }
            });
            return Response.json({ status: 200, isDeleted: true, count: deleteAllCollections.count });
        } else if (id) {
            const deleteCollection = await prisma.collection.delete({
                where: { id: parseInt(id) }
            });
            return Response.json({ status: 200, isDeleted: true });
        } else {
            return Response.json({ status: 400, isDeleted: false, message: "Invalid request data" });
        }
    } catch (error) {
        return Response.json({ status: 500, isDeleted: false, message: error.message });
    }
}