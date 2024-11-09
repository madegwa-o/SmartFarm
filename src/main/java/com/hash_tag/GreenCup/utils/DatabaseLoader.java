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
                    new User(null, "brianmbithi", "securepass1", "Brian", "Mbithi", "brian.mbithi@example.com", "0712345678",
                            "14 Kenyatta Avenue", "Nairobi", dateFormat.parse("1990-06-15"), new Date(), "Male", "USER"),
                    new User(null, "susanwambui", "securepass2", "Susan", "Wambui", "susan.wambui@example.com", "0798765432",
                            "22 Moi Avenue", "Mombasa", dateFormat.parse("1992-11-05"), new Date(), "Female", "USER"),
                    new User(null, "adminkenya", "adminsecure", "Kenya", "Admin", "admin.kenya@example.com", "0700555555",
                            "98 KICC Tower", "Nairobi", dateFormat.parse("1983-03-14"), new Date(), "Male", "ADMIN"),
                    new User(null, "consultantodhiambo", "consult2023", "George", "Odhiambo", "george.odhiambo@example.com", "0711222333",
                            "101 Tea Road", "Kisumu", dateFormat.parse("1987-09-17"), new Date(), "Male", "CONSULTANT"),
                    // New consultants
                    new User(null, "consultantnancy", "nancysecure", "Nancy", "Kamau", "nancy.kamau@example.com", "0711223344",
                            "45 Riverside Drive", "Nairobi", dateFormat.parse("1985-12-20"), new Date(), "Female", "CONSULTANT"),
                    new User(null, "consultantsalim", "salimconsult", "Salim", "Mwangi", "salim.mwangi@example.com", "0722334455",
                            "76 Nkrumah Road", "Mombasa", dateFormat.parse("1987-10-10"), new Date(), "Male", "CONSULTANT"),
                    new User(null, "consultanteva", "evapass123", "Eva", "Mutiso", "eva.mutiso@example.com", "0733445566",
                            "39 Kericho Street", "Kericho", dateFormat.parse("1990-01-25"), new Date(), "Female", "CONSULTANT"),
                    new User(null, "consultantjoseph", "josephconsult", "Joseph", "Kiprotich", "joseph.kiprotich@example.com", "0744556677",
                            "65 Eldoret Highway", "Eldoret", dateFormat.parse("1992-08-08"), new Date(), "Male", "CONSULTANT"),
                    new User(null, "consultantsamina", "saminapass", "Amina", "Ahmed", "amina.ahmed@example.com", "0755667788",
                            "32 Ngong Lane", "Nairobi", dateFormat.parse("1995-02-28"), new Date(), "Female", "CONSULTANT")
            );

            // Save users to the database
            userRepository.saveAll(users);
        };
    }
}
