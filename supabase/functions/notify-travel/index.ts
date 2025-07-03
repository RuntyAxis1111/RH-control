// TODO: Email notification Edge Function for travel notifications
// This function will be triggered by a Postgres trigger when a new travel notification is inserted

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
    //   subject: `New Business Travel Notification from ${record.full_name}`,
    //   html: `
    //     <h2>New Business Travel Notification</h2>
    //     <p><strong>Employee:</strong> ${record.full_name}</p>
    //     <p><strong>Email:</strong> ${record.email}</p>
    //     <p><strong>Division:</strong> ${record.division}</p>
    //     <p><strong>Destination:</strong> ${record.destination}</p>
    //     <p><strong>Travel Dates:</strong> ${record.start_date} to ${record.end_date}</p>
    //     <p><strong>Purpose:</strong> ${record.purpose}</p>
    //     <p><strong>Additional Expenses:</strong> ${record.need_extra_expenses ? 'Yes' : 'No'}</p>
    //     ${record.need_extra_expenses ? `
    //       <p><strong>Expense Reason:</strong> ${record.extra_expenses_reason}</p>
    //       <p><strong>Budget (USD):</strong> $${record.extra_expenses_budget_usd}</p>
    //     ` : ''}
    //     <p><strong>Emergency Contact:</strong> ${record.emergency_contact || 'Not provided'}</p>
    //     <p><strong>Emergency Phone:</strong> ${record.emergency_phone || 'Not provided'}</p>
    //     <p><strong>Flight Info:</strong> ${record.flight_info || 'Not provided'}</p>
    //     <p><strong>Hotel Info:</strong> ${record.hotel_info || 'Not provided'}</p>
    //   `
    // }
    
    // await sendEmail(emailData)
    
    console.log('Travel notification email triggered for:', record.full_name)
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in notify-travel function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})