package develop.secondhandshop;

import develop.secondhandshop.product.Product;
import develop.secondhandshop.product.ProductRepository;
import develop.secondhandshop.user.User;
import develop.secondhandshop.user.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        User user = new User(passwordEncoder.encode("whs12"));
        userRepository.save(user);
        productRepository.saveAll(
                List.of(new Product("더미 상품1", "더미 내용1", 10000000, user),
                        new Product("더미 상품2", "더미 내용2", 10000000, user),
                        new Product("더미 상품3", "더미 내용3", 10000000, user),
                        new Product("더미 상품4", "더미 내용4", 10000000, user),
                        new Product("더미 상품5", "더미 내용5", 10000000, user),
                        new Product("더미 상품6", "더미 내용6", 10000000, user),
                        new Product("더미 상품7", "더미 내용7", 10000000, user),
                        new Product("더미 상품8", "더미 내용8", 10000000, user),
                        new Product("더미 상품9", "더미 내용9", 10000000, user)
                )
        );
    }
}
