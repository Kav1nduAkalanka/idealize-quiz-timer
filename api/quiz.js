export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {

        const query = new URLSearchParams(req.query).toString();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyRj2957oI8RlwsKdLh8rcBM1qpwqz8hT8FZtwzsmM6SuyV7us1HUCHSpwghzGwGIvwOA/exec?" +
            query
        );

        const text = await response.text();

        return res
            .status(200)
            .setHeader("Content-Type", "application/json")
            .send(text);

    } catch (err) {

        return res.status(500).json({
            status: "error",
            message: err.message
        });

    }
}
