import React from 'react'
import { Table } from 'semantic-ui-react'


function TableRowItems(props) {
  return (

    <Table.Row>
      <Table.Cell>{props.ioc.ioc}</Table.Cell>
      <Table.Cell>{props.ioc.type}</Table.Cell>
      <Table.Cell>{props.ioc.analyst}</Table.Cell>
      <Table.Cell>{props.ioc.notes}</Table.Cell>
      <Table.Cell>{props.ioc.case}</Table.Cell>
      <Table.Cell>{props.ioc.version}</Table.Cell>
      <Table.Cell>{props.ioc.createdAt}</Table.Cell>
      <Table.Cell>{props.ioc.updatedAt}</Table.Cell>
    </Table.Row>
    )
}


function TableRows(props) {

  console.log("*********************");
  console.log(props.iocs);

  const listItems = props.iocs.map((ioc, idx) => {
    return <TableRowItems key={idx} ioc={ioc}/>
  })

  return (

    <Table celled selectable>
      <Table.Header class="scrollmenu">
        <Table.Row class="scrollmenu">
          <Table.HeaderCell>IOC</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Analyst</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
          <Table.HeaderCell>Case</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell>CreatedAt</Table.HeaderCell>
          <Table.HeaderCell>UpdatedAt</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {listItems}
      </Table.Body>
    </Table>
  );

}
export default TableRows