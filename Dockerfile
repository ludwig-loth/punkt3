# Use Node.js Alpine for build stage
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy entire project to container
COPY . .

# Set NODE_ENV to production for build
ENV NODE_ENV=production

# Generate Sitemap etc.
RUN npm run generate

# Build the Nuxt application
RUN npm run build

# Verify build output exists
RUN test -d /app/.output || (echo "ERROR: .output directory not found after build" && exit 1)

# Production stage
FROM node:22-alpine AS production

# Set working directory in production container
WORKDIR /app

# Copy built output from build stage to production container
COPY --from=build /app/.output ./.output

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R nuxt:nodejs /app

# Switch to non-root user
USER nuxt

# Expose port the app will run on
EXPOSE 3000

# Set environment variables for proper server binding
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the Nuxt server
CMD ["node", "./.output/server/index.mjs"]