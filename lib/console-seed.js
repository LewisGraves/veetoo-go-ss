//require express
const express = require('express')

//require console model
const Console = require('../models/console')

//create router
const router = express.Router()

//create consoles
const startConsoles = [
	{
		name: 'PC',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Steam_2016_logo_black.svg/2880px-Steam_2016_logo_black.svg.png',
		model: 'custom AMD Ryzen 7 2700X and NVIDIA GTX 1080 system running Windows 10',
		manufacturer: 'Lewis Graves',
		generation: 'N/A',
		releaseDate: '04/25/2018',
		region: 'N/A',
		backwardsCompatibility: 'Through Emulation',
		working: "Yes"
	},
	{
		name: 'SWITCH',
		image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Nintendo_switch_logo.png',
		model: 'HAC-001',
		manufacturer: 'Nintendo',
		generation: 'Gen 8',
		releaseDate: '03/03/2017',
		region: 'North America',
		backwardsCompatibility: 'None',
		working: "Yes"
	},
	{
		name: 'Playstation 2',
		image: 'https://seeklogo.com/images/P/playstation-2-logo-F384843875-seeklogo.com.png',
		manufacturer: 'SONY',
		generation: 'Gen 6',
		releaseDate: '10/29/2004',
		region: 'NTSC-U/C',
		backwardsCompatibility: 'Playstation 1',
		working: "Yes, with disk read errors"
	},
]

//create route
router.get('/consoles', (req, res, next) => {
	Console.deleteMany({})
        .then(() => {
            Console.create(startConsoles)
                .then((consoles) => res.status(200).json({ consoles: consoles }))
        })
        .catch(next)
})

//export router
module.exports = router