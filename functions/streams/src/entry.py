from workers import Response, WorkerEntrypoint
async def on_request(request, env, ctx):
    try:
        url = request.url
        file_name = url.query.get("file")

        # Validate file name
        import re
        if not file_name or not re.match(r"^[\w\-]+\.json$", file_name):
            return Response(
                "Invalid or missing file name.",
                status=400,
                headers={"Access-Control-Allow-Origin": "*"}
            )

        if request.method == "GET":
            obj = await env.MY_BUCKET.get(file_name)
            if not obj:
                return Response(
                    "File not found",
                    status=404,
                    headers={"Access-Control-Allow-Origin": "*"}
                )
            json_data = await obj.text()
            return Response(
                json_data,
                headers={
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            )

        if request.method == "PUT":
            body = await request.text()
            await env.MY_BUCKET.put(
                file_name,
                body,
                http_metadata={"contentType": "application/json"}
            )
            return Response(
                "File uploaded/replaced",
                status=200,
                headers={"Access-Control-Allow-Origin": "*"}
            )

        return Response(
            "Method Not Allowed",
            status=405,
            headers={"Access-Control-Allow-Origin": "*"}
        )
    except Exception as error:
        return Response(
            f"Internal Error: {str(error)}",
            status=500,
            headers={"Access-Control-Allow-Origin": "*"}
        )

export = {
    "fetch": on_request
}
