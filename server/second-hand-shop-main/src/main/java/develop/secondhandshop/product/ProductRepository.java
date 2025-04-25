package develop.secondhandshop.product;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByAlertCountBefore(int alertCount);

    @Query("""
                SELECT p FROM Product p
                WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%')))
                  AND p.alertCount < :maxAlert
            """)
    List<Product> searchByKeywordAndAlertLimit(@Param("keyword") String keyword,
                                               @Param("maxAlert") int maxAlert);

    List<Product> findAllByUserIdAndAlertCountBefore(Long id, int alertCount);
}
