const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//,
//            new BundleAnalyzerPlugin()
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

// console.log(process.env.FIREBASE_API_KEY);
// console.log(process.env.FIREBASE_AUTH_DOMAIN);
// console.log(process.env.FIREBASE_CLIENT_EMAIL);
// console.log(process.env.FIREBASE_DATABASE_URL);
// console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
// console.log(process.env.FIREBASE_PRIVATE_KEY);
// console.log(process.env.FIREBASE_PROJECT_ID);
// console.log(process.env.FIREBASE_STORAGE_BUCKET);

module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin('styles.css');
    
    return {
        entry: './src/app.js',
        devtool: 'inline-source-map',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'public', 'dist')
        },
        module: {
            rules: [
                    {
                        loader: 'babel-loader',
                        test: /\.js$/,
                        exclude: /node_modules/
                    }, {
                        test: /\.s?css$/,
                        use: CSSExtract.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }
                            ]
                        })
                    }, {
                        test: /\.(eot|ttf|woff|woff2)$/,
                        loader: 'file?name=public/fonts/[name].[ext]'
                    }
                   ]
        },
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                algorithm: 'gzip',
                //deleteOriginalAssets: true
            }),
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
};