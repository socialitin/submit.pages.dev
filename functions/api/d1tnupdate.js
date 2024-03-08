
    export async function onRequest(context) {
        const stmt = context.env.DB.prepare("UPDATE hosts SET CompanyName = 'Pereira' WHERE CompanyName LIKE '%tn%' ");
        const result = await stmt.run(); // Execute the prepared statement
    
        // Check the result of the update operation
        if (result.changes > 0) {
            return new Response.json({ success: true, message: 'Records updated successfully.' });
        } else {
            return new Response.json({ success: false, message: 'No records were updated.' });
        }
    }
    