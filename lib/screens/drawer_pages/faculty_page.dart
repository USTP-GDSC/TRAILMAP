import 'package:flutter/material.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

class FacultyPage extends StatelessWidget {
  const FacultyPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const SizedBox(
            height: 40,
          ),
          Stack(
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 10, right: 10),
                child: IconButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  icon: const Icon(Icons.arrow_back),
                ),
              ),
              Center(
                child: Image.asset(
                  'assets/images/USTP 1.png',
                  height: 150,
                ),
              ),
            ],
          ),
          const Divider(),
          TextBold(text: 'Faculties', fontSize: 18, color: Colors.black),
          Expanded(
            child: SizedBox(
              child: ListView.separated(
                itemCount: 50,
                separatorBuilder: ((context, index) {
                  return const Divider();
                }),
                itemBuilder: ((context, index) {
                  return ListTile(
                    leading: const CircleAvatar(
                      minRadius: 50,
                      maxRadius: 50,
                      backgroundColor: Colors.black,
                    ),
                    title: TextBold(
                        text: 'Lorem Ipsum', fontSize: 14, color: Colors.black),
                    subtitle: TextRegular(
                        text: 'Lorem Ipsum', fontSize: 12, color: Colors.grey),
                    trailing: const Icon(Icons.arrow_forward_ios_rounded),
                  );
                }),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
