import 'package:flutter/material.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

class AuthButton extends StatelessWidget {
  late String label;
  late VoidCallback onPressed;
  late Color color;
  late Color textColor;

  late String logo;

  AuthButton(
      {required this.label,
      required this.color,
      required this.onPressed,
      required this.textColor,
      required this.logo});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(40, 0, 40, 0),
      child: MaterialButton(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(100),
          ),
          minWidth: 275,
          height: 50,
          color: color,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
            child: Row(
              children: [
                const SizedBox(
                  width: 20,
                ),
                Image.asset(
                  'assets/images/$logo.png',
                  height: 25,
                ),
                const SizedBox(
                  width: 30,
                ),
                TextBold(
                  text: label,
                  fontSize: 16,
                  color: textColor,
                ),
              ],
            ),
          ),
          onPressed: onPressed),
    );
  }
}
