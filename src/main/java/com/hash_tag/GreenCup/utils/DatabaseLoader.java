package com.hash_tag.GreenCup.utils;

import com.hash_tag.GreenCup.users.User;
import com.hash_tag.GreenCup.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseLoader {

    private final UserRepository userRepository;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            // Define eight users (four existing + five new consultants)
            List<User> users = Arrays.asList(
                    new User(null, "johndoe", "password1", "John", "Doe", "johndoe@example.com", "123456789",
                            "123 Tea Street", "Nairobi", dateFormat.parse("1990-05-15"), new Date(), "Male", "USER"),
                    new User(null, "janedoe", "password2", "Jane", "Doe", "janedoe@example.com", "987654321",
                            "456 Tea Avenue", "Mombasa", dateFormat.parse("1992-08-22"), new Date(), "Female", "USER"),
                    new User(null, "admin", "adminpass", "Admin", "User", "admin@example.com", "555555555",
                            "789 Admin Road", "Nakuru", dateFormat.parse("1985-12-01"), new Date(), "Male", "ADMIN"),
                    new User(null, "consultant", "consultpass", "Consult", "Smith", "consult@example.com", "111222333",
                            "101 Consultant St", "Kericho", dateFormat.parse("1988-02-20"), new Date(), "Female", "CONSULTANT"),
                    // New consultants
                    new User(null, "consultant1", "pass1", "Alice", "Johnson", "alice.johnson@example.com", "222333444",
                            "201 Consultant Ave", "Nairobi", dateFormat.parse("1985-01-15"), new Date(), "Female", "CONSULTANT"),
                    new User(null, "consultant2", "pass2", "Bob", "Smith", "bob.smith@example.com", "333444555",
                            "202 Consultant Blvd", "Nakuru", dateFormat.parse("1987-02-25"), new Date(), "Male", "CONSULTANT"),
                    new User(null, "consultant3", "pass3", "Charlie", "Brown", "charlie.brown@example.com", "444555666",
                            "203 Consultant Rd", "Mombasa", dateFormat.parse("1990-03-30"), new Date(), "Male", "CONSULTANT"),
                    new User(null, "consultant4", "pass4", "Diana", "Prince", "diana.prince@example.com", "555666777",
                            "204 Consultant St", "Kericho", dateFormat.parse("1992-04-10"), new Date(), "Female", "CONSULTANT"),
                    new User(null, "consultant5", "pass5", "Ethan", "Hunt", "ethan.hunt@example.com", "666777888",
                            "205 Consultant Way", "Nairobi", dateFormat.parse("1995-05-20"), new Date(), "Male", "CONSULTANT")
            );

            // Save users to the database
            userRepository.saveAll(users);
        };
    }
}
