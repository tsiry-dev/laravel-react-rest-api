<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function findAll(string $id)
    {
        return  response()->json([
           'data' => Contact::where('user_id', $id)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('contacts')
                    ->where('user_id', Auth::user()->id)
            ],
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $contact = Contact::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
        ]);

        return response()->json([
            'data' => $contact,
            'message' => 'Contact ajouté avec succès.'
        ]);
    }

    public function update(Request $request, Contact $contact)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('contacts')
                    ->ignore($contact->id)
                    ->where('user_id', Auth::user()->id)
            ],
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $contact->update($request->only([
            'name', 'email', 'phone', 'address', 'city', 'country'
        ]));

        return response()->json([
            'data' => $contact->fresh(), // Récupérer les données mises à jour
            'message' => 'Contact mis à jour avec succès.'
        ]);
    }

    public function destroy(Request $request)
    {
        $contact = Contact::find($request->id);

        if(!$contact) {
            return response()->json([
                'message' => 'Impossible de trouver l\'utilisateur.'
            ], 404);
        }

        $contact->delete();
    }

    public function count()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        $count = Contact::where('user_id', $user->id)->count();

        return response()->json([
            'data' => $count,
            'message' => 'Nombre de contacts trouvés.'
        ]);
    }
}
