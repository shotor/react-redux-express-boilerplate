/**
 * User resource routes
 */

import express from 'express'

/**
 * Initialize 
 */ 
const router = express.Router()

/**
 * Routes
 */ 

router.get('/', (req, res) => {
    res.json([])
})

/**
 * Expose router object
 */ 
export default router
