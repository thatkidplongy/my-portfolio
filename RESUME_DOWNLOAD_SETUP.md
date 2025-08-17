# Resume Download Setup Guide

## How to Add Your Resume PDF

### Step 1: Prepare Your Resume
1. **Convert your resume to PDF format** (if not already)
2. **Optimize the file size** (keep under 2MB for best performance)
3. **Use a professional filename** (e.g., `resume.pdf`)

### Step 2: Add to Public Folder
1. **Place your resume PDF in the `public/` folder**
2. **Name it `resume.pdf`** (or update the path in the code)
3. **File path should be:** `public/resume.pdf`

### Step 3: Customize the Download
The download function is located in `src/lib/utils.ts`. You can customize:

```typescript
export const downloadCV = () => {
  const cvUrl = '/resume.pdf'; // Update this path if needed
  const filename = 'Florante_Clavano_Resume.pdf'; // Update this filename
  
  downloadFile(cvUrl, filename);
};
```

### Step 4: Test the Download
1. **Start your development server:** `npm run dev`
2. **Click any "Download CV" button** on your portfolio
3. **Verify the PDF downloads** with your custom filename

## Current Implementation

### ✅ **What's Working:**
- **Hero section** - Download CV button now downloads your resume
- **About section** - Download Full CV button now downloads your resume
- **Automatic filename** - Downloads as "Florante_Clavano_Resume.pdf"
- **Cross-browser compatible** - Works in all modern browsers
- **Maintains animations** - All hover effects and animations preserved

### 📁 **Files Updated:**
- `src/lib/utils.ts` - New utility functions for file downloads
- `src/components/sections/hero.tsx` - Hero Download CV button
- `src/components/sections/about.tsx` - About Download CV button

### 🔧 **Technical Details:**
- Uses HTML5 download attribute for cross-browser compatibility
- Creates temporary anchor element for download
- Automatically cleans up after download
- No external dependencies required

## Customization Options

### Change Download Filename:
```typescript
// In src/lib/utils.ts
const filename = 'Your_Custom_Filename.pdf';
```

### Change Resume Path:
```typescript
// In src/lib/utils.ts
const cvUrl = '/your-custom-path.pdf';
```

### Add Multiple Resume Versations:
```typescript
export const downloadCV = (version = 'full') => {
  const versions = {
    full: '/resume-full.pdf',
    summary: '/resume-summary.pdf',
    technical: '/resume-technical.pdf'
  };
  
  const cvUrl = versions[version] || versions.full;
  const filename = `Florante_Clavano_Resume_${version}.pdf`;
  
  downloadFile(cvUrl, filename);
};
```

## Troubleshooting

### If Download Doesn't Work:
1. **Check file path** - Ensure `resume.pdf` exists in `public/` folder
2. **Check file permissions** - Make sure the PDF is readable
3. **Check browser console** - Look for any error messages
4. **Verify file format** - Ensure it's a valid PDF file

### Common Issues:
- **File not found:** Check the path in `public/` folder
- **Download blocked:** Some browsers may block automatic downloads
- **File corrupted:** Ensure the PDF file is not corrupted

## Next Steps

1. **Add your resume PDF** to the `public/` folder
2. **Name it `resume.pdf`** (or update the path in the code)
3. **Customize the filename** in `src/lib/utils.ts` if desired
4. **Test the download** by clicking the Download CV buttons
5. **Verify the file downloads** with your custom filename

## File Structure
```
portfolio/
├── public/
│   └── resume.pdf          ← Add your resume here
├── src/
│   ├── lib/
│   │   └── utils.ts        ← Download functions
│   └── components/
│       └── sections/
│           ├── hero.tsx    ← Hero Download CV button
│           └── about.tsx   ← About Download CV button
└── RESUME_DOWNLOAD_SETUP.md
```
