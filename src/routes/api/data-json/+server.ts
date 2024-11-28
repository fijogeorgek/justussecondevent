import type { RequestHandler } from './$types';
import { SECRET_TOKEN } from '$env/static/private';
import { supabaseAdmin } from '$lib/server/supabase';


// Function to validate Bearer Token
function validateBearerToken(token) {
    return token === `Bearer ${SECRET_TOKEN}`;
}


export const GET: RequestHandler = async ({ request }) => {
    // Extract the Authorization header
    const authorizationHeader = request.headers.get('Authorization');

    // Check if the token exists and is valid
    if (!authorizationHeader || !validateBearerToken(authorizationHeader)) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Read from the database

    const { data: guests, error: guestsError } = await supabaseAdmin
        .from('guests_new')
        .select('*')

    if (guestsError) {
        return new Response(
            JSON.stringify({ error: 'Error reading from database' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    console.log('Data Read from database API. ')


    // If the token is valid, return the data
    // const jsonData = {
    //     name: 'SvelteKit',
    //     version: '1.0',
    //     features: ['endpoints', 'server-side rendering', 'client-side routing'],
    // };
    const jsonData = {
        data: guests
    };

    return new Response(JSON.stringify(jsonData), {
        headers: { 'Content-Type': 'application/json' },
    });
};







