import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'


function InfoBox({ title, cases, total, isActive, ...props }) {
    return (

        <Card className={`infoBox ${isActive && 'infoBox--selected'}`} onClick={props.onClick}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography color="textSecondary" className="infoBox__total">
                    {total} Total
                    </Typography>
            </CardContent>
        </Card>

    )
}

export default InfoBox
