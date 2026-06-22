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
            "https://script.google.com/macros/s/AKfycbxPbLWjBr1Z74TSRjE2l2-hjxTTb8kzX8jFt9oU_074KubsC9ClWDMP6lnlljUWtLsz/exec?" +
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
