# Salus Chatbot Widget

A customizable chat widget that can be easily embedded into any website.

## Quick Start

Add these two lines to your HTML:

```html
<!-- Include marked.js for markdown support -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<!-- Include the chatbot widget -->
<script src="https://cdn.jsdelivr.net/gh/btackney/chatbottest@latest/dist/chatbot.min.js"></script>
```

Then initialize the chatbot with your desired configuration:

```javascript
initSalusChat({
  title: "Your Title",
  welcomeMessage: "Your welcome message",
  primaryColor: "#your-color",
  secondaryColor: "#your-color",
});
```

## Configuration Options

| Option         | Type   | Default                                                         | Description                                          |
| -------------- | ------ | --------------------------------------------------------------- | ---------------------------------------------------- |
| title          | string | 'Salus Disability'                                              | The title shown in the chat window                   |
| welcomeMessage | string | 'Hi There! Would you like a free Social Security consultation?' | The initial message shown when the chat is opened    |
| primaryColor   | string | '#f56447'                                                       | The primary color used for buttons and user messages |
| secondaryColor | string | '#E4AE20'                                                       | The secondary color used for the gradient background |

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/btackney/chatbottest@latest/dist/chatbot.min.js"></script>
  </head>
  <body>
    <h1>Welcome to my website</h1>

    <script>
      initSalusChat({
        title: "My Chat Support",
        welcomeMessage: "Hello! How can I help you today?",
        primaryColor: "#007bff",
        secondaryColor: "#0056b3",
      });
    </script>
  </body>
</html>
```

## Features

- Mobile responsive
- Markdown support for messages
- Customizable colors and messages
- Session management
- Typing indicators
- Clean, modern design
- Global CDN delivery via jsDelivr

## Support

For support or customization requests, please contact [your contact information].
