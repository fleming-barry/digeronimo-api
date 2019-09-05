const express = require('express')
const router = express.Router()
const {
    poolPromise,
    sql
} = require('../db/db')

router.get('/titles', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request().query('select Job_Title, Job_Id FROM Job_Titles')
        console.log(result)
        let titles = [...new Set(result.recordset)];
        titles = titles.map(t => {
            return {
                id: t.Job_Id,
                title: t.Job_Title.trim()
            }
        })
        console.log(titles)
        titles.filter(t => t.title.toUpperCase().match(`.*OPERATOR.*|.*LABORER.*`))
        return res.send(titles)
    } catch (err) {
        // ... error checks
        console.log(err)
        res.send({
            errors: 'Failed to retrieve job titles'
        })
    }
})


router.get('/zones', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request().query('select [Zone_Id],[Zone_Name] FROM [dbo].[Work_Zones]')
        console.log(result)
        let zones = result.recordset
        zones = zones.map(z => {
            return {
                id: z.Zone_Id,
                zone: z.Zone_Name
            }
        })
        console.log(zones)
        return res.send(zones)
    } catch (err) {
        // ... error checks
        console.log(err)
        res.send({
            errors: 'Failed to retrieve zones'
        })
    }
})

router.get('/search', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('JobTitleId', sql.Int, req.query.zoneId)
            .input('ZoneId', sql.Int, req.query.titleId)
            .execute('[dbo].[SearchZoneAndTitle]')
        console.log('oustide executed',result.recordset)
        let search = result.recordset
        search = search.map(z => {
            return {
                employeeName: z.Employee_Name,
                zipCode: z.Zip_Code,
                title: z.Job_Title,
                titleId: z.Job_Id
            }
        })
        console.log(search)
        return res.send(search)
    } catch (err) {
        // ... error checks
        console.log(err)
        res.send({
            errors: 'Failed to retrieve zones'
        })
    }
})

module.exports = router