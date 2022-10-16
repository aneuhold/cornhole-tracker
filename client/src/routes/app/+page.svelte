<script lang="ts">
  import Table, { type TableData } from 'src/lib/Table/Table.svelte';
  import FabDialer, { type DialerOptions } from 'src/lib/FabDialer/FabDialer.svelte';
  import svgIcons from 'src/util/svgIcons';

  const currentlyRunningGames: TableData = {
    headers: ['Name', '# Completed Rounds'],
    rows: [
      {
        columnVals: ['Game 1', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 2', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 3', '6'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 4', '1'],
        rowClickAction: () => {}
      }
    ]
  };

  const myTeams: TableData = {
    headers: ['Name', 'Players'],
    rows: [
      {
        columnVals: ['Game 1', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 2', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 3', '6'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 4', '1'],
        rowClickAction: () => {}
      }
    ]
  };

  const myCompetition: TableData = {
    headers: ['Name', '# Completed Rounds'],
    rows: [
      {
        columnVals: ['Game 1', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 2', '3'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 3', '6'],
        rowClickAction: () => {}
      },
      {
        columnVals: ['Game 4', '1'],
        rowClickAction: () => {}
      }
    ]
  };

  const dialerOptions: DialerOptions = [
    {
      iconInfo: svgIcons.teamAdd,
      onClickAction: () => {
        console.log('clicked team add');
      }
    },
    {
      iconInfo: svgIcons.gameAdd,
      onClickAction: () => {
        console.log('clicked game add');
      }
    }
  ];
</script>

<div class="appTableContainer">
  <Table
    tableDescription="Your games that aren't currently finished"
    tableData={currentlyRunningGames}
    tableTitle="Currently Running Games"
    tableClasses="bg-green-300"
  />

  <Table
    tableDescription="The teams you are on"
    tableData={myTeams}
    tableTitle="My Teams"
    tableClasses="bg-blue-300"
  />

  <Table
    tableDescription="Teams that you have created or used in the past"
    tableData={myCompetition}
    tableTitle="My Competition"
    tableClasses="bg-yellow-300"
  />

  <FabDialer {dialerOptions} />
</div>

<style>
  .appTableContainer {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin: 0.5rem;
  }
</style>
