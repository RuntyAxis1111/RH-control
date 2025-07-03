// TODO: Email notification Edge Function
// This function will be triggered by a Postgres trigger when a new vacation request is inserted

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    
    // TODO: Configure SendGrid or other email service
    // const emailData = {
    //   to: ['alessandra.quemada@hybecorp.com', 'karla.suarez@hybecorp.com'],
    //   subject: `New Vacation Request from ${record.full_name}`,
    //   html: `
    //     <h2>New Vacation Request</h2>
    //     <p><strong>Employee:</strong> ${record.full_name}</p>
    //     <p><strong>Email:</strong> ${record.email}</p>
    //     <p><strong>Status:</strong> ${record.status_while_away}</p>
    //     <p><strong>Dates:</strong> ${record.start_date} to ${record.end_date}</p>
    //     <p><strong>Manager:</strong> ${record.manager_email}</p>
    //     <p><strong>Comments:</strong> ${record.comments || 'None'}</p>
    //   `
    // }
    
    // await sendEmail(emailData)
    
    console.log('Vacation request notification triggered for:', record.full_name)
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in notify-vacation-request function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})