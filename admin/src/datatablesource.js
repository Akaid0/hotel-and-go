export const userColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "user",
    headerName: "User",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img ? params.row.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
  },

  {
    field: "country",
    headerName: "Country",
    width: 120,
  },
  {
    field: "city",
    headerName: "City",
    width: 120,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 110,
  },
]; 


export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 260,
  },
  {
    field: "type",
    headerName: "Type",
    width: 140,
  },
  {
    field: "title",
    headerName: "Title",
    width: 295,
  },
  {
    field: "city",
    headerName: "City",
    width: 140,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "hotelName",
    headerName: "Hotel",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 240,
  },
  {
    field: "price",
    headerName: "Price",
    width: 90,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

