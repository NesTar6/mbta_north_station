import React from 'react'
import {Table,TableCaption,Tbody, Thead ,Tr, Th, Td,} from '@chakra-ui/react'

export default function TrainTable(props) {

    if(props.arrivalData === [] || props.departData === []) return <div></div>

    return (
    <div style={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:"100%", display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Table variant="striped" colorScheme="green" style={{display:'flex', width: '100%', flexDirection:'column',  alignItems:'center', justifyContent:'center'}}>
            <TableCaption placement="top">NORTH STATION TRAIN DEPARTURE SCHEDULE</TableCaption>
            <Thead>
                <Tr>
                <Th>DEPARTURE TIME</Th>
                <Th>DESTINATION</Th>
                <Th >TRAIN#</Th>
                <Th >STATUS#</Th>
                </Tr>
            </Thead>
            <Tbody>
            {props.departData.map((train) => { 
                let date = new Date(train.attributes.departure_time)
                let now = new Date()
                if (date >= now) {
                    let hour = date.getHours()
                    let minute = date.getMinutes()
                    let time;
                    if(hour > 12) {
                        if (minute.toString().length < 2) minute = `0` + minute

                        hour = hour - 12
                        time = `${hour}:${minute} PM`

                    } else {
                        if (minute.toString().length < 2) minute = `0` + minute

                        time = `${hour}:${minute} AM`
                    }
                    
                    return (
                    <Tr key = {train.trainNumber}>
                        <Td>{time}</Td>
                        <Td>{train.destination}</Td>
                        <Td >{train.trainNumber}</Td>
                        <Td >{train.status ? train.status : "On time"}</Td>
                    </Tr>
                    )
                } 
            })} 
            </Tbody>
        </Table>
        </div>
        <div style={{width:"100%", display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Table variant="striped" colorScheme="green" style={{display:'flex', width: '100%', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: '50px'}}>
            <TableCaption placement="top">NORTH STATION TRAIN ARRIVAL SCHEDULE</TableCaption>
            <Thead>
                <Tr>
                <Th>ARRIVAL TIME</Th>
                <Th>DESTINATION</Th>
                <Th>TRAIN#</Th>
                <Th>STATUS#</Th>
                </Tr>
            </Thead>
            <Tbody>
            {props.arrivalData.map((train) => {
                let date = new Date(train.attributes.arrival_time)
                let now = new Date()
                if (date >= now) {
                let hour = date.getHours()
                let minute = date.getMinutes()
                let time;
                    if(hour > 12) {
                        if (minute.toString().length < 2) minute = `0` + minute

                        hour = hour - 12
                        time = `${hour}:${minute} PM`

                    } else {
                        if (minute.toString().length < 2) minute = `0` + minute

                        time = `${hour}:${minute} AM`
                    }
                return (
                <Tr key = {train.trainNumber}>
                    <Td>{time}</Td>
                    <Td>{train.destination}</Td>
                    <Td>{train.trainNumber}</Td>
                    <Td >{train.status ? train.status : "On time"}</Td>
                </Tr>
                 )
                }
            })}
        </Tbody>
        </Table> 
        </div>
    </div>
    )
}