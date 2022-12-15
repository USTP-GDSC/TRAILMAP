import 'package:flutter/material.dart';

class BottomDrawer extends StatelessWidget {
  const BottomDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [_getSheetIndicator(), _getSheetNavigation()],
    );
  }

  Widget _getSheetIndicator() {
    return (Padding(
      padding: const EdgeInsets.all(7),
      child: SizedBox(
        width: 40,
        height: 5,
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFDBDBDB),
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    ));
  }

  Widget _getSheetNavigation() {
    return Row(
      children: const [
        (Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
          child: Text(
            "Navigate",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 35),
          ),
        )),
      ],
    );
  }
}
