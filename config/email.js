const nodemailer = require('nodemailer');

// Create a transporter using Ethereal (fake email service for testing)
let transporter = null;

// Function to get or create transporter
const getTransporter = async () => {
  if (!transporter) {
    // Create a test account on Ethereal
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('Ethereal email configured');
    console.log('Preview URL will be shown in terminal after sending email');
  }
  return transporter;
};

// Function to send enquiry email
const sendEnquiryEmail = async (enquiry) => {
  try {
    const mailTransporter = await getTransporter();
    
    const mailOptions = {
      from: '"Swabhagya Realty" <noreply@swabhagya.com>',
      to: 'upasanawagh05@gmail.com',  // Your email address
      subject: `🏠 New Property Enquiry from ${enquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background-color: #0a192f; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="color: #d4af37; margin: 0;">Swabhagya Realty</h2>
            <p style="color: white; margin: 5px 0 0;">New Enquiry Received</p>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: #0a192f; margin-top: 0;">Enquiry Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0;">${enquiry.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;">${enquiry.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0;">${enquiry.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Interested In:</td>
                <td style="padding: 10px 0;">${enquiry.interestedIn}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0;">${enquiry.message}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              This enquiry was submitted from Swabhagya Realty website.
            </p>
          </div>
        </div>
      `
    };
    
    const info = await mailTransporter.sendMail(mailOptions);
    
    // IMPORTANT: This is where you can view the email
    console.log('\n========================================');
    console.log('📧 EMAIL PREVIEW URL:');
    console.log(nodemailer.getTestMessageUrl(info));
    console.log('========================================\n');
    console.log('To:', mailOptions.to);
    console.log('Subject:', mailOptions.subject);
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return false;
  }
};

module.exports = { sendEnquiryEmail };