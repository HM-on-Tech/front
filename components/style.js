const style = () => ({
    container: {
      overflow: 'auto',
      height: 600,
      width: '100%',
      '& .MuiDataGrid-cellWithRenderer':{
        display:'block',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    row: {
      minHeight: 0,
    },
  });
  
  export default style;