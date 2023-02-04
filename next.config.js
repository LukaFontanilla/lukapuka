const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['images.ctfassets.net','carbon.now.sh','gist.github.com','lh3.googleusercontent.com']
  },
  webpack: (config,options) => {
    config.resolve.alias = {...config.resolve.alias, ...{svelte: path.resolve('node_modules','svelte')}}
    config.resolve.extensions?.push('.mjs','.js','.svelte')
    config.resolve.mainFields?.push('svelte','browser','module','main')
    config.resolve.conditionNames?.push('svelte')
    config.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules/,
      use: {
        loader: 'svelte-loader',
        options: {
          skipIntroByDefault: true,
          nestedTransitions: true,
          emitCss: true,
          hotReload: true
        }
      }
    })
    config.module.rules.push({
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
    })
    // Important: return the modified config
    return config
  },
}
