# How to Use These Flyer Templates

These HTML flyer templates are designed to be easily customizable for your Coach John events. Follow these steps to create your own custom flyers:

## Option 1: Edit in a Code Editor

1. **Choose a template** that best matches your event type:
   - `basketball-camp-template.html` - For sports camps and athletic events
   - `leadership-workshop-template.html` - For workshops and educational events
   - `community-event-template.html` - For community gatherings and festivals
   - `seniors-program-template.html` - For senior-focused programs

2. **Open the file** in a code editor like Visual Studio Code, Sublime Text, or even Notepad.

3. **Customize the content**:
   - Update the event title, date, time, location, and description
   - Modify the features and benefits to match your event
   - Update contact information if needed

4. **Customize the colors** (optional):
   - Find the `:root` section at the top of the CSS
   - Change the color values to match your branding

5. **Save the file** with a new name related to your event.

6. **Open in a web browser** to preview how it looks.

7. **Print to PDF**:
   - Open the HTML file in Chrome
   - Press Ctrl+P (or Cmd+P on Mac)
   - Select "Save as PDF" as the destination
   - Click "Save"

8. **Add to your website**:
   - Save the PDF in the `/public/flyers/` directory
   - Update the events data in `data/events.ts` to reference your new flyer

## Option 2: Edit Online (No Coding Required)

If you're not comfortable editing HTML code, you can use these online tools:

1. **Upload the template** to an online HTML editor like:
   - [CodePen](https://codepen.io/)
   - [JSFiddle](https://jsfiddle.net/)
   - [HTML Playground](https://playcode.io/html)

2. **Make your changes** in the editor.

3. **Preview and download** as HTML.

4. **Convert to PDF** using your browser's print function.

## Option 3: Use a Design Tool

You can also recreate these designs in tools like:

1. **Canva**:
   - Create a new design with 8.5" × 11" dimensions
   - Use the colors and layout from these templates as inspiration
   - Export as PDF or JPG

2. **Microsoft Publisher** or **Word**:
   - Create a new document with 8.5" × 11" dimensions
   - Recreate the layout and design elements
   - Save as PDF

## Adding Your Flyer to the Website

Once you have your flyer PDF or image:

1. Save it in the `/public/flyers/` directory
2. Open `data/events.ts`
3. Add or update an event entry with the path to your flyer:
   ```javascript
   {
     id: "your-event-id",
     title: "Your Event Title",
     // other event details...
     flyerImage: "/flyers/your-flyer-filename.pdf", // or .jpg, .png
     // other event properties...
   }

