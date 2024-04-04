/**
 * POST /api/submit
 * Optimized to update JSON data using a Cloudflare Worker with a query parameter.
 */
export async function onRequestPost(context) {
  try {
      const formData = await context.request.formData();
      const formDataObject = Object.fromEntries(formData.entries());
      
      // fetch to retrieve existing data 
      const j2upd = await context.env.filterjson.get('NYCS3.json');
      const j2upData = await j2upd.json();
      if (response === null) {
        return new Response('Not found', { status: 404 });
      };

      // obj.body['440-2'] = jsonData;  
//const data1 =JSON.parse(data);
//       data['440-2'].City = 'Cali';
      //const origData1 = JSON.parse(data);
      const origData = j2upData['data'];

      //const origData = { data: [{ "440-2": {} }] }; // This should be replaced with your actual fetch logic

      const subgroupID = "440-2";
      //let found = false;
      
      for (let item of origData) {
          if (item.hasOwnProperty(subgroupID)) {
              item[subgroupID] = formDataObject;
              found = true;
              break;
          }
      }

      if (!found) {
          return new Response('Subgroup ID not found', { status: 404 });
      }

      // Prepare the URL with query parameter
      const url = `https://tournet.socialitin.workers.dev?url=NYCS3.json`;

      const init = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(origData) // Ensure you're sending the updated data structure
      };

      // Perform the PUT request to the Cloudflare Worker
      const response = await fetch(url, init);

      if (!response.ok) {
          // Handle response error
          console.error('Failed to update JSON data:', response.statusText);
          return new Response('Failed to update JSON data', { status: response.status });
      }

      // Success response
      return new Response('JSON data updated successfully', { status: 200 });
  } catch (err) {
      console.error('Error processing request:', err);
      return (JSON.stringify(origData));
      //new Response('Error processing request', { status: 500 });
  }
}
