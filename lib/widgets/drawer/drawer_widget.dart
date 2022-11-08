import 'package:flutter/material.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

import 'drawer_item.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          const SizedBox(
            height: 30,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const SizedBox(),
              IconButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                icon: const Icon(Icons.close),
              ),
            ],
          ),
          Image.asset(
            'assets/images/USTP 1.png',
            width: 175,
          ),
          const Divider(),
          DrawerItem(
              label: 'Faculties', icon: Icons.people_alt_rounded, onTap: () {}),
          const Padding(
            padding: EdgeInsets.only(left: 20, right: 20),
            child: Divider(),
          ),
          DrawerItem(label: 'Handbook', icon: Icons.book, onTap: () {}),
          const Padding(
            padding: EdgeInsets.only(left: 20, right: 20),
            child: Divider(),
          ),
          DrawerItem(label: 'About', icon: Icons.info, onTap: () {}),
          const Padding(
            padding: EdgeInsets.only(left: 20, right: 20),
            child: Divider(),
          ),
          DrawerItem(label: 'Logout', icon: Icons.logout, onTap: () {}),
          const Expanded(
            child: SizedBox(),
          ),
          TextRegular(text: 'powered by', fontSize: 10, color: Colors.grey),
          const SizedBox(
            height: 10,
          ),
          Image.asset(
            'assets/images/download 1.png',
            width: 200,
          ),
          const SizedBox(
            height: 20,
          ),
        ],
      ),
    );
  }
}
