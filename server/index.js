/**
 * Server Entry Point
 */

import express from 'express'
import routes from './routes'
import path from 'path'
import cors from 'cors'

/**
 * Initialize 
 */ 
const app = express()

// allow cross-origin requests in dev mode
if (process.env.APP_ENV !== 'production') {
    app.use(cors());
}

// serve the dist folder containing bundles
app.use('/bin', express.static('dist'))

// serve the public containing all assets
app.use('/public', express.static('public'))

// register api routes
app.use('/api', routes)

/**
 * Serves the main html page on any route except
 * those that are previously registered
 */
app.get('/', (req, res) => {
    res.sendFile(
        'index.html', 
        { root: path.resolve(__dirname) }
    )
})

/**
 * Run
 */
const port = process.env.APP_ENV || 3000
app.listen(port, () => {
    console.log(`[EVENT][SERVER_START][Port=${port}]`)
})
