import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    const cred = req.body;

    const user = await prisma.user.findMany({
        where: {
            AND: [
                { email: cred.email },
                { password: cred.password }
            ]
        },
    });

    if (user.length == 1) {
        res.status(200).json({ message: "Success!" })
    } else {
        res.status(500).json({ message: "Failed!" })
    }

}