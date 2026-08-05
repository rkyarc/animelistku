import prisma from "@/libs/prisma"

export async function POST(request) {
    const { anime_mal_id, user_email, comment, username, anime_title }  = await request.json()
    const data = { anime_mal_id, user_email, comment, username, anime_title }

    const createComment = await prisma.comment.create({ data })

    if (!createComment) return Response.json({ status: 500, isCreated: false })
    else return Response.json({ status: 200, isCreated: true })
}

export async function DELETE(request) {
    const { id, deleteAll, user_email } = await request.json();
    
    try {
        if (deleteAll && user_email) {
            const deleteAllComments = await prisma.comment.deleteMany({
                where: { user_email: user_email }
            });
            return Response.json({ status: 200, isDeleted: true, count: deleteAllComments.count });
        } else if (id) {
            const deleteComment = await prisma.comment.delete({
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