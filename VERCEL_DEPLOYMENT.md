# Deploying SynaptiQ to Vercel

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with your code

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel project settings, add:
   - `NEXT_PUBLIC_GEMINI_API_KEY` = Your Gemini API key

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_GEMINI_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Notes

### Fixed Issues for Vercel Deployment:
✅ Removed `--turbopack` from build command (not supported on Vercel yet)
✅ Added missing `zustand` dependency
✅ Added `vercel.json` configuration
✅ Updated `next.config.ts` for optimal Vercel performance
✅ Added environment variable support for API key
✅ Created `.env.example` for documentation

### Environment Variables Required:
- `NEXT_PUBLIC_GEMINI_API_KEY` - Your Google Gemini API key

### Build Configuration:
- Build Command: `next build`
- Output Directory: `.next`
- Framework: Next.js 15.5.3

## Troubleshooting

### Build Fails?
1. Check that all dependencies are in `package.json`
2. Ensure `zustand` is installed: `npm install zustand`
3. Run `npm run build` locally to test

### API Not Working?
1. Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set in Vercel
2. Check that the API key is valid
3. Review Vercel function logs

### Three.js Issues?
- Three.js requires client-side rendering
- All components using Three.js have `'use client'` directive
- This is already configured correctly

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Vercel Dashboard > Your Project > Settings > Domains
   - Add your custom domain

2. **Environment Variables**
   - Set `NEXT_PUBLIC_GEMINI_API_KEY` in production environment
   - Redeploy after adding environment variables

3. **Monitor**
   - Check Vercel Analytics for performance
   - Review deployment logs for any issues

## Support

For issues related to:
- Vercel deployment: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Gemini API: https://ai.google.dev/docs
