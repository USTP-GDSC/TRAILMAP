/* 
  Flat Buttons are deprecated
*/

// import 'package:flutter/material.dart';
// import 'package:ustp_trailmap/auth/login_page.dart';
// import 'package:ustp_trailmap/screens/drawer_pages/faculty_page.dart';
// import 'package:ustp_trailmap/screens/drawer_pages/handbook_page.dart';
// import 'package:ustp_trailmap/widgets/text_widget.dart';

// import 'drawer_item.dart';

// class DrawerWidget extends StatelessWidget {
//   const DrawerWidget({Key? key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Drawer(
//       child: Column(
//         children: [
//           const SizedBox(
//             height: 30,
//           ),
//           Row(
//             mainAxisAlignment: MainAxisAlignment.spaceBetween,
//             children: [
//               const SizedBox(),
//               IconButton(
//                 onPressed: () {
//                   Navigator.of(context).pop();
//                 },
//                 icon: const Icon(Icons.close),
//               ),
//             ],
//           ),
//           Image.asset(
//             'assets/images/USTP 1.png',
//             width: 175,
//           ),
//           const Divider(),
//           DrawerItem(
//               label: 'Faculties',
//               icon: Icons.people_alt_rounded,
//               onTap: () {
//                 Navigator.of(context).push(MaterialPageRoute(
//                     builder: (context) => const FacultyPage()));
//               }),
//           const Padding(
//             padding: EdgeInsets.only(left: 20, right: 20),
//             child: Divider(),
//           ),
//           DrawerItem(
//               label: 'Handbook',
//               icon: Icons.book,
//               onTap: () {
//                 Navigator.of(context).push(MaterialPageRoute(
//                     builder: (context) => const HandbookPage()));
//               }),
//           const Padding(
//             padding: EdgeInsets.only(left: 20, right: 20),
//             child: Divider(),
//           ),
//           DrawerItem(
//               label: 'About',
//               icon: Icons.info,
//               onTap: () {
//                 showAboutDialog(
//                     applicationLegalese: 'Lorem Ipsum',
//                     context: context,
//                     applicationIcon: Image.asset(
//                       'assets/images/USTP 1.png',
//                       height: 25,
//                     ),
//                     applicationVersion: 'v1.0.0',
//                     applicationName: 'USTP Trail Map');
//               }),
//           const Padding(
//             padding: EdgeInsets.only(left: 20, right: 20),
//             child: Divider(),
//           ),
//           DrawerItem(
//               label: 'Logout',
//               icon: Icons.logout,
//               onTap: () {
//                 showDialog(
//                     context: context,
//                     builder: (context) => AlertDialog(
//                           title: const Text(
//                             'Logout Confirmation',
//                             style: TextStyle(
//                                 fontFamily: 'QBold',
//                                 fontWeight: FontWeight.bold),
//                           ),
//                           content: const Text(
//                             'Are you sure you want to Logout?',
//                             style: TextStyle(fontFamily: 'QRegular'),
//                           ),
//                           actions: <Widget>[
//                             FlatButton(
//                               onPressed: () => Navigator.of(context).pop(true),
//                               child: const Text(
//                                 'Close',
//                                 style: TextStyle(
//                                     fontFamily: 'QRegular',
//                                     fontWeight: FontWeight.bold),
//                               ),
//                             ),
//                             FlatButton(
//                               onPressed: () {
//                                 Navigator.of(context).pushReplacement(
//                                     MaterialPageRoute(
//                                         builder: (context) =>
//                                             const LoginPage()));
//                               },
//                               child: const Text(
//                                 'Continue',
//                                 style: TextStyle(
//                                     fontFamily: 'QRegular',
//                                     fontWeight: FontWeight.bold),
//                               ),
//                             ),
//                           ],
//                         ));
//               }),
//           const Expanded(
//             child: SizedBox(),
//           ),
//           TextRegular(text: 'powered by', fontSize: 10, color: Colors.grey),
//           const SizedBox(
//             height: 10,
//           ),
//           Image.asset(
//             'assets/images/download 1.png',
//             width: 200,
//           ),
//           const SizedBox(
//             height: 20,
//           ),
//         ],
//       ),
//     );
//   }
// }
