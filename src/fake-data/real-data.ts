export const users = [
  {
    name: 'George',
    surname: 'Fields',
    mail: 'george@gmail.com',
    avatar: '/assets/avatar.jpg',
    myContactsId: [],
    id: 'dsjiufhsuh',
  },
];

const tasks = [
  {
    belongsTo: 'userId dsjiufhsuh',
    id: 'asbnfgasuih',
    label: 'Send benefit review by Sunday',
    due_date: 'December 23, 2018',
    status: 'Active',
    type: 'Reminder',
    chartData: {
      name: 'Dec 4',
      uv: 200,
      pv: 980,
      amt: 229,
    },
    pieData: { name: 'Group A', value: 400 },
  },
];

// {
//   bsdcibdvsiodSFDSDFSDsm: {
//     name: 'George',
//     surname: 'Fields',
//     mail: 'george@gmail.com',
//     avatar: '/assets/avatar.jpg',
//     myContactsId: [],
//     tasks: {
//       bsdcibdvsiodSFDdsfsdfSDFSDsm: {
//         label: 'Send benefit review by Sunday',
//         due_date: 'December 23, 2018',
//         status: 'Active',
//         type: 'Reminder',
//         chartData: {
//           name: 'Dec 4',
//           uv: 200,
//           pv: 980,
//           amt: 229,
//         },
//         pieData: { name: 'Group A', value: 400 },
//       },
//     },
//   },
//   uisdfouaiugbfawiubfiuwBE: {
//     name: 'Rebecca',
//     surname: 'Moore',
//     mail: 'Rebecca@gmail.com',
//     avatar: '/assets/avatar.jpg',
//     myContactsId: [],
//     tasks: {
//       bsdcibdvsiodSFDfdgdfdsfsdfSDFSDsm: {
//         label: 'Invite to office meet-up',
//         due_date: 'December 23, 2018',
//         status: 'Completed',
//         type: 'Call',
//         chartData: {
//           name: 'Dec 3',
//           uv: 300,
//           pv: 139,
//           amt: 221,
//         },
//         pieData: { name: 'Group B', value: 300 },
//       },
//     },
//   },
//   IUWHWUFEWUHEW9UHWF9UHEW9H: {
//     name: 'Lindsey',
//     surname: 'Stroud',
//     mail: 'Lindsey@gmail.com',
//     avatar: '/assets/avatar.jpg',
//     myContactsId: [],
//     tasks: {
//       bsdcibdvsiodSFDfdgdfsdfSDFSDsm: {
//         label: 'Office meet-up',
//         due_date: 'December 23, 2018',
//         status: 'Ended',
//         type: 'Event',
//         chartData: {
//           name: 'Dec 2',
//           uv: 400,
//           pv: 240,
//           amt: 240,
//         },
//         pieData: { name: 'Group C', value: 300 },
//       },
//     },
//   },
// };

export default tasks;
