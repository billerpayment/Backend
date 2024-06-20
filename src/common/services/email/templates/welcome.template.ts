export const welcomeEmailTemplate = (firstName: string, link: string) => ({
    text: `
      
        `,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Bilify</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300&display=swap"
            rel="stylesheet">
        <style>
            * {
                box-sizing: border-box;
                font-family: "Montserrat", sans-serif;
            }
    
            body {
                margin: 0;
            }
    
            a {
                text-decoration: none;
                color: unset;
                cursor: pointer;
            }
    
            .primary-btn {
                background: #054b99;
                color: #FFF;
                border-radius: 12px;
                border: 1px solid #054b99;
            }
    
            .primary-btn:hover {
                background: #376fad;
                color: #FFF;
                border: 1px solid #376fad;
            }
    
            .primary-btn:focus {
                background: #054b99;
                color: #FFF;
                border: 1px solid #054b99;
            }
    
            .container {
                max-width: 650px;
                width: 90%;
                margin: auto;
            }
            header {
                margin: 36px 0 30px;
            }
            h1 {
                font-size: 28px;
                font-weight: 500;
                line-height: 42px;
                letter-spacing: 0.4000000059604645px;
            }
    
            h5 {
                font-size: 17px;
                font-weight: 600;
                line-height: 28px;
                letter-spacing: 0px;
                margin: 20px 0;
            }
            p {
                font-size: 14px;
                font-weight: 400;
                line-height: 21px;
            }
            p span {
                font-weight: 700;
            }
            .primary-btn {
                margin: 30px 0 40px;
                padding: 10px 18px;
            }
            .name {
                color: #7C8293;
                margin-bottom: 6px;
            }
            h6 {
                color: #091540;
                font-size: 14px;
                margin-bottom: 30px;
            }
            footer {
                background-color: #054b99;
                padding: 25px 20px;
            }
            footer hr {
                border-color: white;
                margin: 20px 0;
            }
            .socials {
                text-align: center;
            }
            .socials a { 
                margin-right: 26px;
            }
            .lower-footer {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 14px;
            }
            .lower-footer a {
                color: #FFF;
                font-size: 14px;
            }
            .icon {
              width: 150px;
              height: auto;
              margin-right: 10px;
            }
            @media (max-width: 500px) {
                h1 {
                    font-size: 22px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="container">
        <header>
    
        <img src="https://res.cloudinary.com/trade-lenda/image/upload/v1695548057/Logo2_xxaec8.png" alt="Trade lenda logo" class="icon">
  
          <hr style="border-color: #cbcbcb;">
      </header>
            <main>
                <h1>Welcome to Bilify</h1>
                <h5>Hello <span>${firstName}</span>,</h5>
                <p>I would like to personally welcome you to Bilify. We are happy to support you and your business on this journey to scale, understanding the importance your business plays today and the future for the economy.<p/>
               <p> We are set to keep you updated as well as assist you as you go through this journey on our channels.</p>
                <p>Please click the  to login into your dashboard </p>
                <p>
                    <a href=${link} style="color: #FFF" class="primary-btn btn">Your  Dashboard</a>
                </p>
                <p>For further enquires and help, kindly reach out to us via email or chat us directly on Whatsapp </p>
                <div>
                    <a href="mailto:bilify6@gmail.com" style="color: #FFF" class="primary-btn btn">bilify6@gmail.com</a>   <a href ="#"  style="color: #FFF" class="primary-btn btn">WhatsApp</a>
                </div>
                <p>Trade Lenda and her team are here for you!
                </p>
  
                
    
                <div>
                    <p class="name">Charles and Dora</p>
                    <h6>CEO Blify</h6>
                </div>
            </main>
            <footer>
                // <div class="socials">
                //     <a href="https://www.facebook.com/tradelenda">
                //         <img src="https://res.cloudinary.com/trade-lenda/image/upload/v1665692109/facebook_1_t766bg.png" alt="Facebook">
                //     </a>
                //     <a href="https://twitter.com/tradelenda">
                //         <img src="https://res.cloudinary.com/trade-lenda/image/upload/v1665692109/twitter_1_ivjcp2.png" alt="Twitter">
                //     </a>
                //     <a href="https://instagram.com/tradelenda">
                //         <img src="https://res.cloudinary.com/trade-lenda/image/upload/v1665692109/instagram_1_tpfp6r.png" alt="Instagram">
                //     </a>
                //     <a href="https://www.linkedin.com/company/tradelenda">
                //         <img src="https://res.cloudinary.com/trade-lenda/image/upload/v1665692109/linkedin_m7ndhf.png" alt="Instagram">
                //     </a>
                // </div>
                <hr>
                <div class="lower-footer">
                    // <a href="https://wa.me/message/GAU5GAMEHOLTI1">Contact Support</a>
                    // <a href="https://tradelenda.com/Privacy-policy">Privacy</a>
                    // <a href="http://blog.tradelenda.com/">Platform</a>
                </div>
            </footer>
        </div>
    </body>
    
    </html>
        `,
  });