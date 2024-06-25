<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Class RegisterControllerTest
 *
 * This class contains feature tests for the RegisterController.
 */
class RegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful registration.
     *
     * This test verifies that a user can successfully register with valid data
     * and receive a success message along with the created user data.
     *
     * @return void
     */
    public function testSuccessfulRegistration()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'password',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJson(['message' => 'User registered successfully']);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);

        $user = User::where('email', 'test@test.com')->first();
        $this->assertTrue(Hash::check('password', $user->password));
    }


}
