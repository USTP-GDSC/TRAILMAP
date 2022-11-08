import 'package:flutter/material.dart';

import '../../widgets/text_widget.dart';

class ExploreTab extends StatefulWidget {
  const ExploreTab({Key? key}) : super(key: key);

  @override
  State<ExploreTab> createState() => _ExploreTabState();
}

class _ExploreTabState extends State<ExploreTab> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Stack(
          children: [
            Image.asset(
              'assets/images/trailmap 1.png',
              fit: BoxFit.cover,
              height: 570,
              width: double.infinity,
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(30, 70, 30, 0),
              child: GestureDetector(
                onTap: () {
                  showDialog(
                      context: context,
                      builder: (context) {
                        return Dialog(
                          child: Image.asset(
                            'assets/images/legends.png',
                            fit: BoxFit.cover,
                          ),
                        );
                      });
                },
                child: Container(
                  height: 55,
                  width: double.infinity,
                  child: Center(
                    child: ListTile(
                      title: TextRegular(
                          text: 'Search here',
                          fontSize: 14,
                          color: Colors.blue),
                      leading: IconButton(
                        onPressed: () {
                          Scaffold.of(context).openDrawer();
                        },
                        icon: const Icon(Icons.menu, color: Colors.blue),
                      ),
                      trailing: const CircleAvatar(
                        minRadius: 15,
                        maxRadius: 15,
                        backgroundColor: Colors.blue,
                      ),
                    ),
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(100),
                    border: Border.all(color: Colors.black),
                  ),
                ),
              ),
            ),
          ],
        ),
        Expanded(
          child: Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Padding(
                  padding: EdgeInsets.only(left: 150, right: 150),
                  child: Divider(
                    color: Colors.grey,
                    thickness: 5,
                  ),
                ),
                TextRegular(
                    text: 'University of Science and Technology',
                    fontSize: 15,
                    color: Colors.black),
                TextRegular(
                    text: 'of Southern Philippines',
                    fontSize: 15,
                    color: Colors.black),
                const SizedBox(
                  height: 10,
                ),
                const Divider(
                  color: Colors.grey,
                  thickness: 0.5,
                ),
              ],
            ),
            height: 10,
            width: double.infinity,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
