import 'package:flutter/material.dart';

import '../text_widget.dart';

class DrawerItem extends StatelessWidget {
  late String label;
  late IconData icon;
  late VoidCallback onTap;

  DrawerItem({
    required this.label,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20, right: 20),
      child: ListTile(
        onTap: onTap,
        leading: TextRegular(text: label, fontSize: 18, color: Colors.black),
        trailing: Icon(
          icon,
          color: Colors.black,
        ),
      ),
    );
  }
}
