import React from "react";
import { Table } from "react-bootstrap";

export default function Forecast({ data }: { data: any }) {
  if (data == null) return null;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Weather Condition</th>
          <th>Temperature</th>
          <th>Feels Like Temperature</th>
          <th>Humidity</th>
          <th>Sea Level</th>
          <th>Wind Speed</th>
          <th>Visibility</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.name}</td>
          <td>{data.weather[0].description}</td>
          <td>{data.main.temp}</td>
          <td>{data.main.feels_like}</td>
          <td>{data.main.humidity}</td>
          <td>{data.main.sea_level}</td>
          <td>{data.wind.speed}</td>
          <td>{data.visibility}</td>
        </tr>
      </tbody>
    </Table>
  );
}
