export const userColumns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "user",
    headerName: "User",
    width: 250,
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
    width: 135,
  },
  {
    field: "city",
    headerName: "City",
    width: 135,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 135,
  },
]; 


export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 175,
  },
  {
    field: "type",
    headerName: "Type",
    width: 175,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 175,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "title",
    headerName: "Title",
    width: 175,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
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

