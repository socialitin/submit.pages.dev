/**
 * POST /api/submit
 */

export async function onRequest(context) {
    const stmt = context.env.DB.prepare("UPDATE hosts SET CompanyName = 'Cartagena' WHERE CompanyName LIKE '%tn%' ");
    const result = await stmt.run(); // Execute the prepared statement

    // Check the result of the update operation
    if (result.changes > 0) {
        return new Response.json({ success: true, message: 'Records updated successfully.' });
    } else {
        return new Response.json({ success: false, message: 'No records were updated.' });
    }
}
export async function onRequestPost(context) {
    
    try {
      let input = await context.request.formData();
      console.log('pjson', input);
      let pretty = JSON.stringify([...input], null, 2);
      
      return new Response(pretty, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    } catch (err) {
      return new Response('Error parsing JSON content', { status: 400 });
    }
  }
  